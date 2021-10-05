
export const isToday = (daten) => {
    const hoy = new Date()
    const convertDate = new Date(daten)
    let cadHoy = `${hoy.getDay()}${hoy.getMonth()}${hoy.getFullYear()}`
    let cadDate = `${convertDate.getDay()}${convertDate.getMonth()}${convertDate.getFullYear()}`

    return cadHoy === cadDate ? true : false
}
export const getIdUrl = () => {
    let url = window.location.href
    let idUrl = url.split('/')
    return idUrl[idUrl.length - 1]
}