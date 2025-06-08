 
export const removeSpecialCharacter = (str: string) => {
  return str
    .normalize('NFD') // tách dấu ra khỏi chữ
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/[^a-zA-Z0-9\s]/g, '') // xóa ký tự đặc biệt, giữ chữ cái, số, khoảng trắng
    .toLowerCase() // chuyển về chữ thường
}

export const gennerateNameId = ({ name, id }: { name: string; id: number }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + '-i.' + id
}

export const getIdFromUrl = (nameid: string) => {
  const arr = nameid.split('-i.')
  return arr[arr.length - 1]
}
