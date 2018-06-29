export const directionDisplay = (bearing) => {
    
    const angleAdder = [0, 45, 90, 135, 180, 225, 270, 315, 360]
    const startAngle = 22.5
    if ((bearing - (startAngle + angleAdder[0])) * (bearing - (startAngle + angleAdder[1])) <= 0) {
        return "NE"}
    if ((bearing - (startAngle + angleAdder[1])) * (bearing - (startAngle + angleAdder[2])) <= 0) {
        return "E"}
  if ((bearing - (startAngle + angleAdder[2])) * (bearing - (startAngle + angleAdder[3])) <= 0) {
        return "SE"}
  if ((bearing - (startAngle + angleAdder[3])) * (bearing - (startAngle + angleAdder[4])) <= 0) {
        return "S"}
  if ((bearing - (startAngle + angleAdder[4])) * (bearing - (startAngle + angleAdder[5])) <= 0) {
        return "SW"}
  if ((bearing - (startAngle + angleAdder[5])) * (bearing - (startAngle + angleAdder[6])) <= 0) {
        return "W"}
  if ((bearing - (startAngle + angleAdder[6])) * (bearing - (startAngle + angleAdder[7])) <= 0) {
        return "NW"}
  if ((bearing - (startAngle + angleAdder[7])) * (bearing - angleAdder[8]) <= 0) {
        return "N"} else return "N"
}
