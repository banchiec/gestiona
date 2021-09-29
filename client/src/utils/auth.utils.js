export const isLoggin = (currentUser,) => {
    console.log(currentUser?.role)
}
export const isAdmin = (currentUser) => {
    // console.log(currentUser)
    return currentUser?.role === 'admin' ? true : false
    // console.log(currentUser?.role)
}