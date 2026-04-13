export function getCommentsLabel(count: number) {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} комментариев`;
  }

  if (mod10 === 1) {
    return `${count} комментарий`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} комментария`;
  }

  return `${count} комментариев`;
}
