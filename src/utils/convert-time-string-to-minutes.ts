export function convertTimeStringToMinutes(timeString : string ) {
    const [hours, minutes ] = timeString.split(':').map(Number) //divide a string, retornando um array

return hours * 60 + minutes
}