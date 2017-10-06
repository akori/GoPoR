FROM golang

RUN mkdir -p /go/src/app  

RUN go get gopkg.in/gorp.v1
RUN go get github.com/codegangsta/gin
RUN go get github.com/lib/pq
RUN go get github.com/gin-gonic/gin


ENV PORT 8080

WORKDIR /go/src/app

COPY . /go/src/app

# RUN go get -v  

RUN go build main.go structs.go