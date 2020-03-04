import { getFoods } from "../../utils/database";

const getFood = async (req, res) => {
  try {
    const data = await getFoods();
    return res.status(200).json({
      status: "success",
      data: data
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err
    });
  }
};

export default getFood;
