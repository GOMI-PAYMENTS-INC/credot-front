export const setCategoryData = (data: TCategoryAnalysis) => {
  const { categories } = data;
  const backGroundColor = [
    'rgba(255, 117, 0, 1)',
    'rgba(24, 160, 251, 1)',
    'rgba(123, 97, 255, 1)',
    'rgba(255, 105, 122, 1)',
    'rgba(30, 242, 140, 1)',
    'rgba(255, 229, 0, 1)',
  ];

  return categories
    .filter((_, idx) => idx < 5)
    .map((categorie, index) => {
      const { productCount, infos } = categorie;

      const category = infos.reduce((pre, cur) => {
        return pre === '' ? pre + cur.name : pre + ' > ' + cur.name;
      }, '');

      return {
        count: productCount,
        category: category,
        background: backGroundColor[index],
      };
    });
};
