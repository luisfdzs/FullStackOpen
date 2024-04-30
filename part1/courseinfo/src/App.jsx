const Header = (props) => <h1>{props.course}</h1>
const Part = (props) => <p>{props.part} {props.exercises}</p>
const Content = (props) => (
    <>
        <Part part={props.part1.name} exercises={props.part1.exercises1}/>
        <Part part={props.part2.name} exercises={props.part2.exercises2}/>
        <Part part={props.part3.name} exercises={props.part3.exercises3}/>
    </>
)
const Total = ({totalExercises}) => {
    return <p>Number of exercises {totalExercises}</p>
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }
    const totalExercises = part1.exercises + part2.exercises + part3.exercises

    return (
      <div>
        <Header course={course}/>
        <Content part1={part1} part2={part2} part3={part3}/>
        <Total totalExercises={totalExercises}/>
      </div>
    )
  }
  
  export default App