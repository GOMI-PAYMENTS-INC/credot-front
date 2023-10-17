type TCategory = 'insight' | 'news' | 'product';

type TCard = 'main' | '' | 'recommandation';

type TContent = {
  id: number;
  text: string;
  category: string;
  path: string;
  img: string;
  subscription: string;
  position: string;
  name: string;
  updatedAt: string;
  mainImg: string;
};
