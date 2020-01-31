/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
Defining my global variables
***/

// Selecting all students on the page
const studentListItems = document.querySelectorAll('.student-item');
// Hardcoding a value for number of students per page
const studentsPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.
***/

const showPage = (list, page) => {
   // determining start and end points for the list. It's called from within the event listener below
   // and the page parameter is populated by the number clicked on by the user.
   let startIndex = (page * studentsPerPage ) - studentsPerPage;
   let endIndex = page * studentsPerPage;

   // console was throwing an error because increments of 10
   // this adjustment to endIndex reduces the endindex to the number of list items
   // if endIndex is greater than the number of list items
   if (endIndex > list.length) {
      endIndex = list.length; 
   }

   // console.log(startIndex, endIndex);


   let studentList = document.querySelector('.student-list');
   // empty the div
   studentList.innerHTML = '';

   // fill the div with appropriate number of students.
   for (let i=startIndex; i < endIndex; i++ ) {
      // list parameter passed through two functions finally used here.
      studentList.appendChild(list[i]);
   }

}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {

   // take list parameter and divide by items per page and rounded up to figure out how many pages
   let numberOfPages = Math.ceil(list.length / studentsPerPage);
   let divPage = document.querySelector('.page');

   // creating the HTML elements - div > ul
   let pagination = document.createElement('DIV');
   pagination.className = "pagination";
   paginationList = document.createElement('UL');
   pagination.appendChild(paginationList);
   // and adding them to the appropriate place in the DOM
   divPage.appendChild(pagination);

   createListItems();

   // calling the show page function to show the first page. This can be changed with the event listener below.
   showPage(studentListItems, 1);

   // Finally run the listener which allows the user to navigate between pages.
   listenForPageNavigation();
   
   // these two functions are function declarations rather than function expressions with arrow functions because
   // I got an error of "cannot access before initialization" when I made these arrow functions
   // so I went back to good old dependable function declarations.
   function createListItems() {
      // adding each li in the page to the ul.
      for (let i=1; i <= numberOfPages; i++) {
         let item = document.createElement('LI');
         item.innerHTML=`<a href="#">${i}</a>`;
         if (i === 1) {
            item.className = "active"
         }
         //adding my 
         paginationList.appendChild(item);
      }
   }

   function listenForPageNavigation () { 
      pagination.addEventListener('click', (e) => {
         if (e.target.tagName === "A") {
            resetPages();
            e.target.parentNode.className = "active";
            let page = e.target.textContent
            showPage(studentListItems, page);
         }
      })
   }

   // this removes all the active classes before it is then added to the li that was clicked.
   const resetPages = () => {
      for (let i=0; i < numberOfPages; i++) {
         paginationList.children[i].className = '';
      }
   }
   
}

appendPageLinks(studentListItems);

// Remember to delete the comments that came with this file, and replace them with your own code comments.