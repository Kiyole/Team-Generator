const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require('./lib/Employee')
const util = require('util');
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
//const manager = [];
//const intern = [];
//const engineer = [];
//const writeFileAsync = util.promisify(fs.writeFile);
const team = [];
function managerQuestion(){
    return inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the manager name',
            name: 'name'
        },
        {   
            type: 'input',
            messgae: 'What is the manager id',
            name: 'managerID'
        },
        {
            type: 'input',
            message: 'What is your office number?',
            name: 'officeNumber',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        },
    ])
    .then(data =>{
        //manager.push(data);
        //console.log(manager);
        const manager = new Manager(data.name, data.managerID, data.email, data.officeNumber)
        console.log(manager)
        team.push(manager);
        addEmployee();
    })
}
function addEmployee(){
    inquirer
    .prompt({
        type: 'list',
        message: 'What type of employee would you like to add next',
        name: 'role',
        choices: [
            'Manager',
            'Engineer',
            'Intern',
            'No more employees',
        ]
    }).then(newEmployee => {
        const role = newEmployee.role
        switch(role){
            case 'Manager' :
                managerQuestion();
               break;
            case 'Intern' :
                internQuestion();
                break;
            case 'Engineer' : 
                engineerQuestion();
                break;
            case 'No more employees' :
                renderFun();
                break

        }
    })
}
function internQuestion(){
inquirer
.prompt([
{
        type: 'input',
        message: 'What is their name',
        name: 'internName',
},
{
    type: 'input',
    message:'What is thier ID',
    name: 'internID',

},
{
    type: 'input',
    message: 'What is thier email',
    name: 'internEmail',
},
{
    type: 'input',
    message: 'What school did they attend',
    name: 'school',
}]).then(data =>{
    const intern = new Intern(data.internName, data.internID, data.internEmail, data.school)
    team.push(intern);
    //intern.push(internData);
    console.log(intern);
    addEmployee();
})
}
function engineerQuestion(){
inquirer
.prompt([
{
        type: 'input',
        message: 'What is their name',
        name: 'engineerName',
},
{
    type: 'input',
    message:'What is thier ID',
    name: 'engineerID',

},
{
    type: 'input',
    message: 'What is their email',
    name: 'engineerEmail',
},
{
    type: 'input',
    message: 'What is their Github username',
    name: 'gitName',
}]).then(data =>{
    const engineer = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.gitName)
    team.push(engineer);
    //engineer.push(engineerData);
    console.log(engineer);
    addEmployee();
})
}

function renderFun(){
  fs.writeFile(outputPath, render(team), (err) => {
      if(err) throw err;
      console.log('Success!')
  })
    
}
managerQuestion();
// function generateEngineer(engineer){
//     return `
//     <div class="card employee-card">
//     <div class="card-header">
//         <h2 class="card-title">${engineer.engineerName}</h2>
//         <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>{{ role }}</h3>
//     </div>
//     <div class="card-body">
//         <ul class="list-group">
//             <li class="list-group-item">ID: ${engineer.engineerID}</li>
//             <li class="list-group-item">Email: <a href="mailto: ${engineer.engineerEmail}">{{ email }}</a></li>
//             <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.gitName}" target="_blank" rel="noopener noreferrer">${engineerGithub}</a>{{ github }}</a></li>
//         </ul>
//     </div>
// </div>`
// }
// async function init(){
//     try{
//         const engineer = await engineerQuestion();
//         const html = generateEngineer(engineer)
//         await writeFileAsync('engineer2.html', html);
//         console.log('Wrote engineer')

//     } catch (err) {
//         console.log(err);
//     }
// }
// init();
// function buildCard(role, name, id, email){
// let data = fs.readFileSync(`./templates/${role}.html`, 'utf8')
// let sub = `${role}`

// fs.appendFileSync("./output/team.html", data, err => { if (err) throw err;})
// console.log(sub.name)
// }    

//managerQuestion();
//buildCard();
//buildTeam();
