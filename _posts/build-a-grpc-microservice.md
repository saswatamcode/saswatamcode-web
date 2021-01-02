---
title: 'Build a gRPC microservice in Go'
excerpt: "If you've dealt with microservices before, you've probably heard about gRPC. In this blog, we'll be exploring the awesome world of gRPC and write our very own microservice with it. We'll also delve into why gRPC might be better than our traditional REST architectures as well the caveats associated with it."
coverImage: '/assets/blog/preview/cover.jpg'
date: '2020-12-06T05:35:07.322Z'
author:
  name: Saswata Mukherjee
  picture: '/assets/blog/authors/saswatamcode.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

Hey there!

If you've dealt with microservices before, you've probably heard about `gRPC`.

In this blog, we'll be exploring the awesome world of gRPC and write our very own microservice with it. We'll also delve into why gRPC might be better than our traditional REST architectures as well the caveats associated with it.

## What is gRPC?

> gRPC is a modern open source high performance RPC framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.

That's according to the [official documentation](http://grpc.io). Let's try to understand what an RPC framework is.

Remote Procedure Calls or RPC allow applications to communicate with each other in distributed systems. Simply put, it allows us to expose methods in our application that we want other applications to access.

It is sort of similar to REST in the sense that we are exposing functionality in our application over HTTP.

## Differences between gRPC and REST

There are a few fundamental differences in how these two work:

1. gRPC utilizes `HTTP/2` whereas REST utilizes `HTTP/1.1`. Using `HTTP/2` enables certain capabilites such as server-side streaming, client-side streaming or even bidirectional-streaming. If you want to dig deeper into the difference between `HTTP/2` and `1.1` you can refer to this [article](https://www.digitalocean.com/community/tutorials/http-1-1-vs-http-2-what-s-the-difference#:~:text=As%20opposed%20to%20HTTP%2F1.1,verbs%2C%20methods%2C%20and%20headers.).
2. gRPC uses Protocol Buffers as opposed to the standard JSON data format typically used in REST. You can read about them [here](https://developers.google.com/protocol-buffers).

## gRPC Caveats

While gRPC allows use you to use the latest and greatest stuff, there are certain challenges that it introduces. Traditional REST prototyping tools like Postman don't work easily with gRPC. There are workarounds to make it work but it isn't available natively. Howerver alternatives like [BloomRPC](https://github.com/uw-labs/bloomrpc) and [gRPCurl](https://github.com/fullstorydev/grpcurl) do exist.

There are even options to use tools such as [envoy](https://www.envoyproxy.io/) to reverse proxy standard JSON requests and transcode them into the right data format but this is an additional dependency that can be tricky to set up for simple projects.

## Prerequisites

Before proceeding, make sure you have, atleast a high level understanding of protocol buffers. If you aren't familiar with them, I've written a [tutorial](https://dev.to/dsckiitdev/protocol-buffers-in-go-5bl7) which you can check out.

Also make sure you have the [protoc](https://github.com/golang/protobuf) tool installed on your system by running `protoc --version`.

## Building our server

Let's start by initializing a new go module in a new directory. Run the following

```bash
go mod init grpc_using_go
```

Great! Now we'll start by defining a really simple server which our gRPC client will interact with.

First we'll listen on a a port for incoming TCP connections. We'll also be using [logrus](https://github.com/sirupsen/logrus) to generate structured logs. Create a `main.go` with the following code.

```go
package main

import (
	"net"
	"os"

	log "github.com/sirupsen/logrus"
)

func main() {
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
	})

	var port string
	var ok bool
	port, ok = os.LookupEnv("PORT")
	if ok {
		log.WithFields(log.Fields{
			"PORT": port,
		}).Info("PORT env var defined")

	} else {
		port = "9000"
		log.WithFields(log.Fields{
			"PORT": port,
		}).Warn("PORT env var not defined. Going with default")

	}

	_, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.WithFields(log.Fields{
			"Error": err.Error(),
		}).Fatal("Failed to listen")
	}
}
```

Here, I'm using `os.LookupEnv` which checks if a particular environment variable exists and returns the the value of the variable and a boolean. So if `PORT` is defined we'll use that or default to 9000. We're using logrus to generate nice structured color coded output with levels like Info, Warn, Error and Fatal.

Next, we'll import the official gRPC package from [golang.org](http://golang.org) in order to create our gRPC server. We'll also register our endpoints and server over our TCP connection which we defined above.

```go
package main

import (
	"net"
	"os"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

func main() {
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
	})

	var port string
	var ok bool
	port, ok = os.LookupEnv("PORT")
	if ok {
		log.WithFields(log.Fields{
			"PORT": port,
		}).Info("PORT env var defined")

	} else {
		port = "9000"
		log.WithFields(log.Fields{
			"PORT": port,
		}).Warn("PORT env var not defined. Going with default")

	}

	l, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.WithFields(log.Fields{
			"Error": err.Error(),
		}).Fatal("Failed to listen")
	}

	grpcServer := grpc.NewServer()

	log.Info("gRPC server started at ", port)
	if err := grpcServer.Serve(l); err != nil {
		log.WithFields(log.Fields{
			"Error": err.Error(),
		}).Fatal("Failed to serve")
	}

}
```

We just defined our `grpcServer` but currently it doesn't do a whole lot. So let's start adding some functionality to our server.

We'll start by defining our schema which will be a simple book structure with the properties of name and isbn number as well as an rpc service and method. Let's make our `book.proto` file like so.

```go
syntax = "proto3";
package book;

message Book {
    string name = 1;
    int32 isbn = 2;
}

service BookService {
    rpc GetBook(Book) returns (Book) {}
}
```

This file defines the structure for `Book` protocol buffers and exposes a single service `BookService`. This service again has a single method `GetBook` which can now be called by any gRPC client written in any supported language.

These `.proto` files act as our "contracts" and typically can be shared across all clients. They can generate their own code and then communicate smoothly with our gRPC server.

Now, we'll generate the Go code for our `.proto` file using the `protoc` tool as mentioned above. Make a directory named `book` in the root of the project.

Now, run the following,

```bash
protoc --go_out=plugins=grpc:book book.proto
```

You should see that this generated a `book/book.pb.go` file. This file contains all the generated Go code which we can now use in our code to register our services and use our methods.

But as you can probably guess, this auto-generated code does not contain a definition for our service method `GetBook`. This is intentional since we would like to define what our gRPC service methods can do.

So let's go ahead and define our service method `GetBook` first. Create another file within the book directory `book.go`. This file will define the `GetBook`. For the sake of learning, we're just going to take a `Book` protocol buffer as argument, read the name and isbn, and then return a new `Book`.

```go
package book

import (
	log "github.com/sirupsen/logrus"

	"golang.org/x/net/context"
)

// Server interface for our service methods
type Server struct {
}

// GetBook logs Book from client and returns new Book
func (s *Server) GetBook(ctx context.Context, input *Book) (*Book, error) {

	log.WithFields(log.Fields{
		"Name": input.Name,
		"Isbn": input.Isbn,
	}).Info("Book data received from client")

	return &Book{Name: "The Great Gatsby", Isbn: 90393}, nil
}
```

As you can see our method now has a definition. If we wanted to add more methods in our `BookService` we would simply need to add it to `book.proto` and define it off of our Server `struct`. Thus our application would be able to expose that method that gRPC clients can use.

Finally let's register this newly-defined method in `main.go`.

```go
package main

import (
	"net"
	"os"

	"grpc_using_go/book"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

func main() {
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
	})

	var port string
	var ok bool
	port, ok = os.LookupEnv("PORT")
	if ok {
		log.WithFields(log.Fields{
			"PORT": port,
		}).Info("PORT env var defined")

	} else {
		port = "9000"
		log.WithFields(log.Fields{
			"PORT": port,
		}).Warn("PORT env var not defined. Going with default")

	}

	l, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.WithFields(log.Fields{
			"Error": err.Error(),
		}).Fatal("Failed to listen")
	}

	s := book.Server{}

	grpcServer := grpc.NewServer()

	book.RegisterBookServiceServer(grpcServer, &s)

	log.Info("gRPC server started at ", port)
	if err := grpcServer.Serve(l); err != nil {
		log.WithFields(log.Fields{
			"Error": err.Error(),
		}).Fatal("Failed to serve")
	}

}
```

Now, that it has been registered, it's finally time to run and test our code. Go ahead and run `go run main.go`. You should see the following logs pop up in your terminal.

```bash
WARN[2020-12-05T23:27:12+05:30] PORT env var not defined. Going with default  PORT=9000
INFO[2020-12-05T23:27:12+05:30] gRPC server started at 9000
```

Aside from the timestamp, it should be the same.

Yay! You're gRPC server is now running. You can make the WARN log go away by simply setting an environment variable using `export PORT=9000`.

Alright, now let's test this. Fire up a new terminal. We'll be using a tool known as [gRPCurl](https://github.com/fullstorydev/grpcurl) to test our gRPC server. If you're on a Mac, simply install it using [homebrew](https://brew.sh/) by running,

```bash
brew install grpcurl
```

For other platforms and package managers, refer to installation instructions in the linked repo.

Now, to test our server using this, we need to enable something known as gRPC Server Reflection. gRPC Server Reflection provides information about publicly-accessible gRPC services on a server, and assists clients at runtime to construct RPC requests and responses without precompiled service information. You can learn more about it [here](https://chromium.googlesource.com/external/github.com/grpc/grpc-go/+/HEAD/Documentation/server-reflection-tutorial.md).

All we need to do is add the reflection package and simply add one line of code as shown below.

```go
package main

import (
	"net"
	"os"

	"grpc_using_go/book"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
	})

	var port string
	var ok bool
	port, ok = os.LookupEnv("PORT")
	if ok {
		log.WithFields(log.Fields{
			"PORT": port,
		}).Info("PORT env var defined")

	} else {
		port = "9000"
		log.WithFields(log.Fields{
			"PORT": port,
		}).Warn("PORT env var not defined. Going with default")

	}

	l, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.WithFields(log.Fields{
			"Error": err.Error(),
		}).Fatal("Failed to listen")
	}

	s := book.Server{}

	grpcServer := grpc.NewServer()

	reflection.Register(grpcServer)

	book.RegisterBookServiceServer(grpcServer, &s)

	log.Info("gRPC server started at ", port)
	if err := grpcServer.Serve(l); err != nil {
		log.WithFields(log.Fields{
			"Error": err.Error(),
		}).Fatal("Failed to serve")
	}

}
```

Simply restart your server again, open another terminal and run the following command,

```bash
grpcurl -plaintext localhost:9000 list
```

The `-plaintext` flag is due to the fact that our local server has no TLS certificate yet. `list` lists all our registered service on our server. Our gRPC server is `[localhost:9000](http://localhost:9000)` You should see the following output.

```bash
book.BookService
grpc.reflection.v1alpha.ServerReflection
```

Nice! Our gRPC service shows up. Let's see a bit more detail by running the following,

```bash
grpcurl -plaintext localhost:9000 describe
```

`describe` describes all our service and methods as you can see below,

```bash
book.BookService is a service:
service BookService {
  rpc GetBook ( .book.Book ) returns ( .book.Book );
}
grpc.reflection.v1alpha.ServerReflection is a service:
service ServerReflection {
  rpc ServerReflectionInfo ( stream .grpc.reflection.v1alpha.ServerReflectionRequest ) returns ( stream .grpc.reflection.v1alpha.ServerReflectionResponse );
}
```

Finally let's test our `GetBook` method by running the following,

```bash
grpcurl -d '{"name": "To Kill a Mockingbird", "isbn": 12345}' -plaintext localhost:9000 book.BookService/GetBook
```

The `-d` flag is used to send non-empty request body while invoking a RPC method. Here we specify the name and isbn of a book. All arguments must come before the server address. At the end we specify the service and method name in `Service/Method` format. You should see the following output as well as a new server log.

```bash
{
  "name": "The Great Gatsby",
  "isbn": 90393
}

INFO[2020-12-05T23:31:04+05:30] Book data received from client                Isbn=12345 Name="To Kill a Mockingbird"
```

## Conclusion

If you'd like to dig deeper into gRPC and discover all the cool things you can make with it, read the official docs,

[gRPC Docs](https://grpc.io/docs/)

Also, here's an [awesome list of resources](https://github.com/grpc-ecosystem/awesome-grpc) to learn further!

If you get stuck here's the [repo](https://github.com/saswatamcode/grpc_using_go) with all the code!

For any queries reach out to my [socials](https://twitter.com/saswatamcode) or [GitHub](https://github.com/saswatamcode)!
