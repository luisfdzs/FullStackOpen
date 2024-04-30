const Header = (props) => <h1>{props.course}</h1>
const Part = (props) => <p>{props.part} {props.exercises}</p>
const Content = ({parts}) => (
    <>
        {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises}/>)}
    </>
)
const Total = ({parts}) => <p>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</p>
const App = () => {
    const course = 'Half Stack application development'
    const parts = [{
        name: 'Fundamentals of React',
        exercises: 10
    },{
        name: 'Using props to pass data',
        exercises: 7
    },{
        name: 'State of a component',
        exercises: 14
    }]
    return (
      <div>
        <Header course={course}/>
        <Content parts={parts}/>
        <Total parts={parts}/>
      </div>
    )
  }
  
  export default App