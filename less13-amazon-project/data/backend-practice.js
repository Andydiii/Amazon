const xhr = new XMLHttpRequest();


// predefine what to do when response is loaded/ready
// action 'load' here means the response is ready
xhr.addEventListener('load', () => {
    // get response from backend after response is ready
    console.log(xhr.response);
});

// set up the reuqest type and url
// url: address of another computer on the internet
// https: a language used to communicate between computers
// //supersimplebackend.dev is the domian name, an address points to another backend computer
// URL path is after domain

// if URL is https://supersimplebackend.dev, it means url path is / only
xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');

// send the request to backend
xhr.send();

// URL path: 
// in a backend, only a few URL path and coressponding reponses are supported.
    
    // status code: 
        //  starts with 4 or 5(400, 404, 500) = failed
        //  if it starts with 4, it means our problem, e.g. we sent a non-existing URL path
        //  if it starts with 5, it means backend problem, e.g. backend crashed

        //  starts with 2(200, 201, 204) = succeeded

    // how to know what url path is supported? 
        // -> no way 
        // or some backend provides that e.g. supersimplebackend.dev/documentation
        // the list of all url paths supported are called backend API (application programming interface) 

// backend response type : 
//   1. text
//   2. JSON string (if want object, use JSON.parse to convert it back to object)
//   3. HTML
//   4. image (have to open the browser and put in URL to see it, cannot see it by console/network)



// way to use URL of the backend:
//      1. making requst using URL to interact with backend
//      2. using browser = making a GET request

