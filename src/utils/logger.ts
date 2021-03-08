const info = (info: string): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(info);
  }
};

const error = (error: string): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error);
  }
};

export default {
  info,
  error
};