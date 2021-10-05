export const isLoggin = (currentUser,) => {
    console.log(currentUser?.role)
}
export const isAdmin = (currentUser) => {
    return currentUser?.role === 'admin' ? true : false
}