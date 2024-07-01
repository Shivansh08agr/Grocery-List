// const Header = (props) => { //you can do this or destructure the props
const Header = ({title}) => { 

    return (
        <header>
            {/* <h1>{props.title}</h1> 1st method */}
            <h1>{title}</h1> {/*2nd method */}
        </header>
    )
}
// used if no props are provided in App.js
Header.defaultProps= {
    title: "Default Props"
};
export default Header;