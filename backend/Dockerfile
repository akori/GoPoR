FROM golang

RUN mkdir -p /go/src/app  
RUN go get -u github.com/lib/pq 
WORKDIR /go/src/app

COPY . /go/src/app

RUN go get -v  
