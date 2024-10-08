// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});
// calculate heights

// ********** Testimonials Carousel ************
const testimonials = [
  {
    text: "This was the most amazing travel experience ever! Highly recommend!",
    author: "Vandana Johnson",
  },
  {
    text: "A perfect getaway with family. We had the best time!",
    author: "Anjali Davis",
  },
  {
    text: "The tour guides were very knowledgeable and helpful. Great experience!",
    author: "Ravi Smith",
  },
  {
    text: "Best vacation I’ve ever had. Stunning views and great service!",
    author: "James Brown",
  },
];

let currentTestimonial = 0;

function updateTestimonial() {
  const testimonialText = document.getElementById('testimonial-text');
  const testimonialAuthor = document.getElementById('testimonial-author');

  testimonialText.textContent = testimonials[currentTestimonial].text;
  testimonialAuthor.textContent = `- ${testimonials[currentTestimonial].author}`;

  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Change testimonials every 5 seconds
setInterval(updateTestimonial, 5000);


// ********** Animated Counters ************

const counters = document.querySelectorAll('.counter');
const speed = 200; // Adjust this value to control speed of the count

function animateCounter() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

let statsSection = document.getElementById('statistics');
let statsVisible = false;

window.addEventListener('scroll', function () {
  const statsTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (!statsVisible && statsTop < windowHeight - 100) {
    animateCounter();
    statsVisible = true;
  }
});