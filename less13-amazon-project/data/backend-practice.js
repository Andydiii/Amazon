const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

// set up the reuqest type and url
xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send();