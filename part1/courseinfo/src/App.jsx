const Header = ({course}) => <h1>{course.name}</h1>
const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Content = ({course}) => <>{course.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises}/>)}</>
const Total = ({course}) => <p>Number of exercises {course.parts.reduce((total, part) => total + part.exercises, 0)}</p>
const Course = ({course}) => (
  <>
    <Header course={course}/>
    <Content course={course}/>
    {/* <Total course={course}/> */}
  </>
)
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: 
        [{
            name: 'Fundamentals of React',
            exercises: 10
        },{
            name: 'Using props to pass data',
            exercises: 7
        },{
            name: 'State of a component',
            exercises: 14
        },{
          name: 'LastPart!!',
          exercises: 10717
      }]
    }
    return <Course course={course}/>
  }
  
  export default App