export const createJobId = () => {
  const PREFIX = 'cr_report_';

  const date = new Date();
  const month = date.getMonth() + 1;
  const [_, _a, day, year, time] = date.toString().split(' ');
  const _time = time.split(':').join('');
  return PREFIX + year + month + day + _time;
};
