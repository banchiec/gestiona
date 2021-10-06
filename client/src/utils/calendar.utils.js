export const isToday = (daten) => {
    const hoy = new Date()
    const convertDate = new Date(daten)
    // let cadHoy = `${hoy.getDay()}${hoy.getMonth()}${hoy.getFullYear()}`
    // let cadDate = `${convertDate.getDay()}/${convertDate.getMonth()}/${convertDate.getFullYear()}`

    // console.log(convertDate.getDate())
    // console.log(hoy.getDate())
    return hoy.getDate() === convertDate.getDate() ? true : false
}
export const getIdUrl = () => {
    let url = window.location.href
    let idUrl = url.split('/')
    return idUrl[idUrl.length - 1]
}