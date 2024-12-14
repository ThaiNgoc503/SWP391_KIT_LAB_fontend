import { useEffect, useMemo, useState } from "react";
import Card from "../../customer/components/Card";
import { getProductAPI, getProductPaginationAPI } from "../../api/ProductAPI";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLength, setProductLength] = useState();
  const [money, setMoney] = useState(0);
  const [age, setAge] = useState(0);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const data = { PageNumber: pageNumber, PageSize: 12 }; //gồm số tang và độ dài của sản phẩm
    const response = await getProductPaginationAPI(data);
    setProduct(response);

    const getAllProducts = await getProductAPI(); //lấy độ dài mãng
    const length = Math.ceil(getAllProducts.length / 12); //lấy số trang
    setProductLength(length);
  };

  const loadData = async (pageNumber) => {
    //load lại data khi ra trước hoặc ra sau
    const data = { PageNumber: pageNumber, PageSize: 12 };
    const response = await getProductPaginationAPI(data);
    setProduct(response); //lấy đc 12 sản phẩm để hiện
    setPageNumber(pageNumber); //set lại số trang
  };

  const filteredProducts = useMemo(() => {
    return product.filter((product) => {
      let ageMatch = true;
      let moneyMatch = true;

      const ages = Number.parseInt(product.ages);

      if (age !== 0) {
        ageMatch = ages >= age;
      }

      if (money !== 0) {
        switch (money) {
          case 99:
            moneyMatch = product.price <= 99000;
            break;
          case 199:
            moneyMatch = product.price > 99000 && product.price <= 199000;
            break;
          case 299:
            moneyMatch = product.price > 199000 && product.price <= 299000;
            break;
          case 399:
            moneyMatch = product.price > 299000 && product.price <= 399000;
            break;
          case 499:
            moneyMatch = product.price > 399000 && product.price <= 499000;
            break;
          case 599:
            moneyMatch = product.price > 499000 && product.price <= 1000000;
            break;
          case 699:
            moneyMatch = product.price > 1000000;
            break;
          default:
            moneyMatch = true;
            break;
        }
      }

      return ageMatch && moneyMatch;
    });
  }, [product, age, money]);

  const ResetFilter = async () => {
    const data = { PageNumber: 1, PageSize: 12 };
    const response = await getProductPaginationAPI(data);
    setProduct(response);
  };

  const renderPagination = () => {
    const pages = Array.from(
      { length: productLength },
      (_, index) => index + 1,
    );
    return pages.map((page) => (
      <button
        key={page}
        className={`mx-1 rounded px-2 py-1 ${
          pageNumber === page
            ? "bg-cyan-600 text-white"
            : "bg-gray-200 text-cyan-600"
        }`}
        onClick={() => loadData(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      <h2 className="b inline-block pl-7 pt-5 text-2xl font-semibold text-black">
        All Product
      </h2>
      <div className="ml-10 mr-24 flex">
        <form className="h-[900px] rounded-lg bg-white p-3 md:h-[700px] md:w-[250px]">
          <p className="text-lg font-medium text-cyan-600">Age</p>
          <ul>
            <li>
              <ul className="ml-2 space-y-2 pt-2">
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="2"
                    value={2}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="2" className="pl-2">
                    2+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="3"
                    value={3}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="3" className="pl-2">
                    3+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="4"
                    value={4}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="4" className="pl-2">
                    4+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="5"
                    value={5}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="5" className="pl-2">
                    5+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="6"
                    value={6}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="6" className="pl-2">
                    6+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="7"
                    value={7}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="7" className="pl-2">
                    7+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="8"
                    value={8}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="8" className="pl-2">
                    8+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="9"
                    value={9}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="9" className="pl-2">
                    9+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="10"
                    value={10}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="10" className="pl-2">
                    10+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="11"
                    value={11}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="11" className="pl-2">
                    11+
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="age"
                    id="12"
                    value={12}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <label htmlFor="12" className="pl-2">
                    12+
                  </label>
                </li>
              </ul>
            </li>
            <li>
              <hr />
              <p className="pt-2 text-lg font-medium text-cyan-600">Money</p>
              <ul className="ml-2 space-y-2 pt-2">
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="money"
                    id="99"
                    value={99}
                    onChange={(e) => setMoney(Number(e.target.value))}
                  />
                  <label htmlFor="99" className="pl-2">
                    0 - 99.000
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="money"
                    id="199"
                    value={199}
                    onChange={(e) => setMoney(Number(e.target.value))}
                  />
                  <label htmlFor="199" className="pl-2">
                    100.000 - 199.000
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="money"
                    id="299"
                    value={299}
                    onChange={(e) => setMoney(Number(e.target.value))}
                  />
                  <label htmlFor="299" className="pl-2">
                    200.000 - 299.000
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="money"
                    id="399"
                    value={399}
                    onChange={(e) => setMoney(Number(e.target.value))}
                  />
                  <label htmlFor="399" className="pl-2">
                    300.000 - 399.000
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="money"
                    id="499"
                    value={499}
                    onChange={(e) => setMoney(Number(e.target.value))}
                  />
                  <label htmlFor="499" className="pl-2">
                    400.000 - 499.000
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="money"
                    id="599"
                    value={599}
                    onChange={(e) => setMoney(Number(e.target.value))}
                  />
                  <label htmlFor="599" className="pl-2">
                    500.000 - 1.000.000
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    name="money"
                    id="699"
                    value={699}
                    onChange={(e) => setMoney(Number(e.target.value))}
                  />
                  <label htmlFor="699" className="pl-2">
                    more than 1.000.000
                  </label>
                </li>
              </ul>
            </li>
          </ul>
          <div className="flex items-center text-center">
            <button
              onClick={ResetFilter}
              className="mt-2 w-full rounded-lg bg-slate-300 p-1 px-2 hover:bg-cyan-600 hover:text-white"
            >
              Reset
            </button>
          </div>
        </form>
        <div>
          <div className="grid grid-cols-2 justify-items-center pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.productId}
                imagePath={product.imagePath}
                productName={product.productName}
                productPrice={product.price}
                productId={product.productId}
              />
            ))}
          </div>
          <div
            className={`flex justify-center p-10 ${filteredProducts.length == 0 ? "hidden" : "inline-block"}`}
          >
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
