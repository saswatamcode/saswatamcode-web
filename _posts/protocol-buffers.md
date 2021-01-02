---
title: 'Protocol Buffers in Go'
excerpt: "If you've explored the world of microservices, you've probably come across the term gRPC. A major reason why gRPC has grown so popular, is due to the fact that it uses a special mechanism for data serialisation which makes payloads smaller, faster and simpler known as Protocol Buffers"
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-08-05T05:35:07.322Z'
author:
  name: Saswata Mukherjee
  picture: '/assets/blog/authors/saswatamcode.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

Hey there! If you've explored the world of microservices, you've probably come across the term `gRPC`. It's a modern open source high performance Remote Procedure Call framework which can run in any environment. It's grown super popular recently with scalable distributed system architecture.

A major reason why `gRPC` has grown so popular, is due to the fact that it uses a special mechanism for data serialisation which makes payloads smaller, faster and simpler. This helps us save those precious milliseconds. But what is this special mechanism?

Enter Protocol Buffers.

## What are Protocol Buffers?

> Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serialising structured data – think XML, but smaller, faster, and simpler. You define how you want your data to be structured once, then you can use special generated source code to easily write and read your structured data to and from a variety of data streams and using a variety of languages.

That's according to the [official documentation](https://developers.google.com/protocol-buffers).

They are essentially a data format like JSON or XML i.e, they can store structured data which can then be serialised and de-serialised by a wide number of languages. Let's understand this with a few examples!

Imagine your storing data about books. So a sample XML will look like this.

```xml
<book>
	<name>Animal Farm</name>
	<isbn>104</isbn>
</book>
```

We could represent the same structured data using a smaller footprint with JSON.

```json
{
  "name": "Animal Farm",
  "isbn": 104
}
```

And if we were to represent this using protocol buffers, it would look something like this.

```bash
[10 11 65 110 105 109 97 108 32 70 97 114 109 16 104]
```

If you observe the above wire encoded output closely, you might see that starting from position 2 of the array, the name of the book, "Animal Farm" is spelled out with 'A' = 65, 'n'=110 an so on. The last element is a byte representation of the isbn. While this looks simple there's much more to the encoding than what meets the eye. If you'd like to delve into the details of the encoding format you can read more [here](https://developers.google.com/protocol-buffers/docs/encoding).

Now, at this scale the size of both the JSON and the Protocol Buffer seem to be quite similar. But as your data increases, a lot of the size and complexity gets shaved off which will lead to smaller and more efficient payloads for your application. Let's see how we can use Protocol Buffers in Go!

## Setting Up Protocol Buffers

We're going to cook up a simple example to see how protocol buffers work in Go. Let's get started by initialising a new go module in a new directory. Run the following.

```bash
go mod init protobuf_using_go
```

Now, install the packages required.

```bash
go get -u github.com/golang/protobuf
go get -u github.com/golang/protobuf/proto
go install google.golang.org/protobuf/cmd/protoc-gen-go
```

Make sure your `.bashrc` or `.zshrc` file has the following environment variables.

```bash
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

You can even use a package manager like homebrew to install the `protoc` binary. Make sure you have the binary installed by running `protoc --version`. We're going to be using a version above 3.

For any issues related to installation you can refer to the [official repo.](https://github.com/golang/protobuf)

Now, we can go about defining our `protobuf` schema. We'll need to start with a `.proto` file. Let's define the book structure we saw earlier.

```go
// book.proto
syntax="proto3";

package main;

message Book {
    string name = 1;
    int32 isbn = 2;
}
```

Let's understand what we just wrote. At first we specified the syntax we want to use which is `"proto3"` and specified that we want this to be a part of the `main` package.

Then we specify our schema. The definitions in a `.proto` file are simple: you add a `message` for each data structure you want to serialise, then specify a name and a type for each field in the `message`. Here Book is our data structure which will have two fields, `name` of type `string` and `isbn` of type `int32`. Keep in mind that the type comes before the variable name unlike Go.

Also each field is associated with a unique number. These numbers are used to identify our fields in the encoded message and shouldn't be changed once the message type is in use.

Now, let's go ahead and compile this with the protocol buffer compiler using the following command.

```bash
protoc --go_out=. *.proto
```

The `--go_out` flag specifies which directory the generated Go code for the `.proto` will be stored in. We're keeping it at the root of the project. The second argument specifies which file to compile. Here, we're compiling all files with a `.proto` extension. Running this should generate a `book.pb.go` file with the equivalent Go code we require to use our book protocol buffer. Next, let's write code to read/write data using our protocol buffer.

## Specifying Field Rules

We can specify certain rules for our message structure fields as well.

- `required`: a message must have exactly one of this field
- `optional`: a message can have zero or just one of this field
- `repeated`: this field can be repeated any number of times in the message including zero

  For example we can make the `isbn` field optional by writing

  ```go
   optional int32 isbn = 2;
  ```

For this tutorial we won't be using field rules outside of the default ones.

## Working with Protocol Buffers

Let's create a new file `main.go` with the following code.

```go
// main.go
package main

import (
	"fmt"
	"log"

	"github.com/golang/protobuf/proto"
)

func main() {

	myBook := &Book{
		Name: "Animal Farm",
		Isbn: 104,
	}

	data, err := proto.Marshal(myBook)
	if err != nil {
		log.Fatal("marshaling error: ", err)
	}

	fmt.Println(data)

	myNewBook := &Book{}
	err = proto.Unmarshal(data, myNewBook)
	if err != nil {
		log.Fatal("Unmarshaling error: ", err)
	}

	fmt.Println(myNewBook.GetName())
	fmt.Println(myNewBook.GetIsbn())
}
```

That's a lot of new code so let's break it down.

First we create a variable `myBook` , which is a pointer to the `Book` struct defined in `book.pb.go`. and we set the fields with our data. Notice that the fields start with a capital letter now. Then we use the `Marshal` function to serialise our protocol buffer data and store it in `data` which we print out. This will print our encoded data.

Now we want to de-serialise the encoded message, i.e, read a protocol buffer. So we declare a new pointer to `Book`, `myNewBook`, with empty fields. Then, we use the `Unmarshal` function to de-serialise the encoded message stored in the `data`, and store it in `myNewBook`. Finally we use the getter methods, `GetName()` and `GetIsbn()`, provided in our generated code to retrieve and print the fields. Let's go ahead and run this. We need to pass in the generate code file as well.

```bash
go run main.go book.pb.go
```

You should see the following output,

```bash
[10 11 65 110 105 109 97 108 32 70 97 114 109 16 104]
Animal Farm
104
```

## Nested Fields

Just like JSON, our Protocol Buffer might contain nested data. So let's go ahead and add nested elements in our `book.proto` file.

```go
// book.proto
syntax="proto3";

package main;

message Author {
    string name = 1;
    int32 yearOfPublishing = 2;
}

message Book {
    string name = 1;
    int32 isbn = 2;
    Author author = 3;
}
```

Here, we've again defined a message structure, `Author`, with fields `name` and `yearOfPublishing`. Then in order to nest this inside `Book`, we've added a field of type `Author` and name `author` to it. Using this we have effectively created a nested structure.

Now we simply generate the equivalent Go code for this by running,

```go
protoc --go_out=. *.proto
```

Now, let's make the changes in our main file!

```go
// main.go
package main

import (
	"fmt"
	"log"

	"github.com/golang/protobuf/proto"
)

func main() {

	myBook := &Book{
		Name: "Animal Farm",
		Isbn: 104,
		Author: &Author{
			Name:             "George Orwell",
			YearOfPublishing: 1945,
		},
	}

	data, err := proto.Marshal(myBook)
	if err != nil {
		log.Fatal("marshaling error: ", err)
	}

	fmt.Println(data)

	myNewBook := &Book{}
	err = proto.Unmarshal(data, myNewBook)
	if err != nil {
		log.Fatal("Unmarshaling error: ", err)
	}

	fmt.Println(myNewBook.GetName())
	fmt.Println(myNewBook.GetIsbn())
	fmt.Println(myNewBook.Author.GetName())
	fmt.Println(myNewBook.Author.GetYearOfPublishing())
}
```

If you see the code above, you'll notice that we've added a new field, `Author` to `myBook`, which points to the `Author` type in our generated code. We set the field with the relevant data.

There's no change in our marshalling and un-marshalling methods. Finally, we access the newly set fields via getter functions, `Author.GetName()` and `Author.GetYearOfPublishing()`, of the nested message structure and display it. Run it with the command:

```bash
go run main.go book.pb.go
```

You should see the following output.

```bash
[10 11 65 110 105 109 97 108 32 70 97 114 109 16 104 26 18 10 13 71 101 111 114 103 101 32 79 114 119 101 108 108 16 153 15]
Animal Farm
104
George Orwell
1945
```

## Conclusion

If you'd like to dig deeper into Protocol Buffers and discover all the cool stuff you can do with it, read the official docs,

[Protocol Buffer Docs](https://developers.google.com/protocol-buffers)

For any queries reach out to my [socials](https://twitter.com/saswatamcode) or [GitHub](https://github.com/saswatamcode)!
