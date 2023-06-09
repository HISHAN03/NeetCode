const QUESTIONS = [
    {
      title: "Two states",
      description: "Given an array, return the maximum of the array?",
      testCases: [
        {
          input: "[1,2,3,4,5]",
          output: "5",
        },
      ],
    },
  ];

  const questionList = document.getElementById('question-list');
  
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const card = document.createElement('div');
    card.className = 'card my-3';
  
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'mb-0';
    const cardLink = document.createElement('a');
    cardLink.className = 'collapsed';
    cardLink.setAttribute('data-toggle', 'collapse');
    cardLink.setAttribute('href', `#collapse${i}`);
    cardLink.setAttribute('aria-expanded', 'false');
    cardLink.setAttribute('aria-controls', `collapse${i}`);
    cardLink.textContent = question.title;
    cardTitle.appendChild(cardLink);
    cardHeader.appendChild(cardTitle);
    card.appendChild(cardHeader);
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const cardDescription = document.createElement('p');
    cardDescription.textContent = question.description;
    cardBody.appendChild(cardDescription);
  
    const cardCollapse = document.createElement('div');
    cardCollapse.id = `collapse${i}`;
    cardCollapse.className = 'collapse';
    cardCollapse.setAttribute('aria-labelledby', `heading${i}`);
    cardCollapse.setAttribute('data-parent', '#question-list');
  
    const cardTestCaseList = document.createElement('ul');
    cardTestCaseList.className = 'list-group list-group-flush';
  
    for (let j = 0; j < question.testCases.length; j++) {
      const testCase = question.testCases[j];
      const cardTestCase = document.createElement('li');
      cardTestCase.className = 'list-group-item';
      cardTestCase.innerHTML = `
        <span class="font-weight-bold">Input: </span>
        <code>${testCase.input}</code><br>
        <span class="font-weight-bold">Output: </span>
        <code>${testCase.output}</code>
      `;
      cardTestCaseList.appendChild(cardTestCase);
    }
  
    cardCollapse.appendChild(cardTestCaseList);
    cardBody.appendChild(cardCollapse);
  
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    const solveButton = document.createElement('button');
    solveButton.className = 'btn btn-solve';
    solveButton.textContent = 'Solve This';
    cardFooter.appendChild(solveButton);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
   questionList.appendChild(card);
  }
  