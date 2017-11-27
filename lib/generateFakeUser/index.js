//RandomData
import freeEmail from './freeEmail.json';
import names from './names.json';
import lastNames from './lastNames.json';

const cleanString = string => {
  string = string.toLowerCase()
  for (var i=0;i<string.length;i++){
    if (string.charAt(i)=="á") string = string.replace(/á/,"a");
    if (string.charAt(i)=="é") string = string.replace(/é/,"e");
    if (string.charAt(i)=="í") string = string.replace(/í/,"i");
    if (string.charAt(i)=="ó") string = string.replace(/ó/,"o");
    if (string.charAt(i)=="ú") string = string.replace(/ú/,"u");
  }
  return string;
};

const getRandomNumber = max => {
  return Math.floor(Math.random() * max)
};

const getRandomNameByGender = gender => {
  const arrayNames = names.filter(name => name.gender === gender)
  return arrayNames[getRandomNumber(arrayNames.length)].name
};

const getRandomSurname = () => {
  return lastNames[getRandomNumber(lastNames.length)]
};

const createFakeEmail = (name, surname) => {
  const userName = cleanString(name.substring(0,4)).trim()
  const userSurname = cleanString(surname.substring(0,6)).trim()
  return `${userName}${userSurname}@${freeEmail[getRandomNumber(freeEmail.length)]}`
};

export default gender => {
  const name = getRandomNameByGender(gender);
  const surname = getRandomSurname();
  return {
    gender: gender,
    completeName: `${name} ${surname} ${getRandomSurname()}`,
    email: createFakeEmail(name, surname)
  }
};
