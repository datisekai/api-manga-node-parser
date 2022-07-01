const getSlugChap = (url: string, defalltParams: string) => {
  return url.split(`${process.env.BASE_URL}${defalltParams}`)[1];
};

export default getSlugChap;
