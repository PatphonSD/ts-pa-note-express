export function generateRandomNumber(): number {
    const min = 1000000000000; // 13 หลักต่ำสุด
    const max = 9999999999999; // 13 หลักสูงสุด
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return parseInt(randomNum.toString())
}