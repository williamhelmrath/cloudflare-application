addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = "https://cfw-takehome.developers.workers.dev/api/variants";
  const value = await fetch(url);
  const data = await value.json();
  let res;

  Math.random() < 0.5
    ? (res = await fetch(data.variants[0]))
    : (res = await fetch(data.variants[1]));

  return new HTMLRewriter().on("*", new ElementHandler()).transform(res);
}

class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    console.log(`Incoming element: ${element.tagName}`);
    if (element.tagName === "h1")
      element.setInnerContent("Welcome to my application");
    if (element.tagName === "title")
      element.setInnerContent("William's application");
    if (element.tagName === "p")
      element.setInnerContent("Check out my GitHub!");
    if (element.tagName === "a") {
      element.setInnerContent("Click here");
      element.setAttribute("href", "https://github.com/williamhelmrath");
    }
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}
