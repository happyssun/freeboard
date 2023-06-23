export const getDate = (value: string | number | Date) => {
  const date = new Date(value);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// padStart(2,'0') 의미
// - 두자리로 나타내주고 빈자리이면 0을 넣어줘 7월이면 07월로 표기
 