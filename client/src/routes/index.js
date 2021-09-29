import { Redirect, Route, Switch } from "react-router"
import EditUser from "../pages/EditUser/EditUser"
import HomePage from "../pages/Home/Homepage"
import Login from "../pages/Login/Login"
import Profile from "../pages/Profile/Profile"
import Signup from "../pages/Signup/Signup"
import UserList from "../pages/UserList/UserList"

const Routes = ({ storeUser, loggedUser }) => {
    return (
        <Switch>
            <Route exact path="/" render={() => <HomePage loggedUser={loggedUser} />} />
            <Route exact path="/registro" render={(props) => <Signup {...props} />} />
            <Route exact path="/iniciar-sesion" render={(props) => <Login storeUser={storeUser} {...props} />} />
            <Route exact path="/editar" render={(props) => <EditUser storeUser={storeUser} {...props} />} />

            <Route path="/perfil" render={() => loggedUser ? <Profile loggedUser={loggedUser} /> : <Redirect to="/iniciar-sesion" />} />
            <Route exact path="/usuarios" render={(props) => <UserList {...props} loggedUser={loggedUser} />} />

        </Switch>
    )
}
export default Routes