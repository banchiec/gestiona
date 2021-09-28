import { Route, Switch } from "react-router"
import HomePage from "../pages/Home/Homepage"
import Login from "../pages/Login/Login"
import Signup from "../pages/Signup/Signup"

const Routes = ({ storeUser, loggedUser }) => {
    return (
        <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/registro" render={(props) => <Signup {...props} />} />
            <Route exact path="/iniciar-sesion" render={(props) => <Login storeUser={storeUser} {...props} />} />
        </Switch>
    )
}
export default Routes