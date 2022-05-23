import { Form, Select, Row, Col } from "antd";
import { useCallback, useEffect, useState } from "react";
import styles from "../Project.module.css";
const { Option } = Select;

export interface Category {
  PrimaryCategory: string;
  PrimarySubcategory: string;
  Category: string;
  Subcategory: string;
}

const PrimaryCategoryData: any = [
  "Art",
  "Comics",
  "Crafts",
  "Dance",
  "Design",
  "Fashion",
  "FilmVideo",
  "Food",
  "Games",
  "Journalism",
  "Music",
  "Photography",
  "Publishing",
  "Technology",
  "Theater",
];

const subcategoryData: any = {
  Art: [
    "--No subcategory--",
    "Ceramics",
    "Conceptual Art",
    "Digital Art",
    "Illustration",
    "Installation",
    "Mixed Media",
    "Painting",
    "Performance Art",
    "Public Art",
    "Sculpture",
    "Social Practice",
    "Textiles",
    "Video Art",
  ],
  Comics: [
    "--No subcategory--",
    "Anthologies",
    "Comic Books",
    "Events",
    "Graphic Novels",
    "Webcomics",
  ],
  Crafts: [
    "--No subcategory--",
    "Candles",
    "Crochet",
    "DIY",
    "Embroidery",
    "Glass",
    "Knitting",
    "Pottery",
    "Printing",
    "Quilts",
    "Stationery",
    "Weaving",
    "Woodworking",
  ],
  Dance: [
    "--No subcategory--",
    "Performances",
    "Residencies",
    "Spaces",
    "Workshops",
  ],
  Design: [
    "--No subcategory--",
    "Architecture",
    "Civic Design",
    "Graphic Design",
    "Interactive Design",
    "Product Design",
    "Toys",
    "Typography",
  ],
  Fashion: [
    "--No subcategory--",
    "Accessories",
    "Apparel",
    "Childrenswear",
    "Couture",
    "Footwear",
    "Jewelry",
    "Pet Fashion",
    "Ready-To-Wear",
  ],
  FilmVideo: [
    "--No subcategory--",
    "Action",
    "Animation",
    "Comedy",
    "Documentary",
    "Drama",
    "Experimental",
    "Family",
    "Fantasy",
    "Festivals",
    "Horror",
    "Shorts",
  ],
  Food: [
    "--No subcategory--",
    "Bacon",
    "Community Gardens",
    "Cookbooks",
    "Drinks",
    "Events",
    "Farmer`s Markets",
    "Farms",
    "Food Trucks",
    "Restaurants",
    "Small Batch",
    "Spaces",
    "Vegan",
  ],
  Games: [
    "--No subcategory--",
    "Gaming Hardware",
    "Live Games",
    "Mobile Games",
    "Playing Cards",
    "Puzzles",
    "Tabletop Games",
    "Video Games",
  ],
  Journalism: ["--No subcategory--", "Audio", "Photo", "Print", "Video", "Web"],
  Music: [
    "--No subcategory--",
    "Blues",
    "Chiptune",
    "Classical Music",
    "Comedy",
    "Country & Folk",
    "Hip-Hop",
    "Jazz",
    "Latin",
    "Metal",
  ],
  Photography: [
    "--No subcategory--",
    "Animals",
    "Fine Art",
    "Nature",
    "People",
    "Photobooks",
    "Places",
  ],
  Publishing: [
    "--No subcategory--",
    "Academic",
    "Anthologies",
    "Art Books",
    "Calendars",
    "Comedy",
  ],
  Technology: [
    "--No subcategory--",
    "3D Printing",
    "Apps",
    "Camera Equipment",
    "DIY Electronics",
    "Fabrication Tools",
  ],
  Theater: [
    "--No subcategory--",
    "Comedy",
    "Experimental",
    "Festival",
    "Immersive",
    "Musical",
    "Plays",
    "Spaces",
  ],
};

export interface CategoryProps {
  getCategoryValue(category: Category): void;
}

function ProjectCategory(props: CategoryProps) {
  const [Totalcategory, setTotalCategory] = useState<Category>({
    PrimaryCategory: "Art",
    PrimarySubcategory: "",
    Category: "",
    Subcategory: "",
  });

  const [Primary, setPrimary] = useState(
    subcategoryData[PrimaryCategoryData[0]]
  );
  const [Secondary, setSecondary] = useState(
    subcategoryData[PrimaryCategoryData[0]][0]
  );
  const [Category, setCategory] = useState(
    subcategoryData[PrimaryCategoryData[0]]
  );
  const [SecondaryCategory, setSecondaryCategory] = useState(
    subcategoryData[PrimaryCategoryData[0]][0]
  );

  const handlePrimaryChange = (value: any) => {
    setPrimary(subcategoryData[value]);
    setSecondary(subcategoryData[value][0]);
    let index = PrimaryCategoryData.indexOf(value);
    setTotalCategory((prev) => {
      (prev as any).PrimaryCategory = PrimaryCategoryData[index];
      const newValue = { ...prev };
      return newValue;
    });
  };

  const onSecondaryChange = (value: any) => {
    setSecondary(value);
    setTotalCategory((prev) => {
      (prev as any).PrimarySubcategory = value;
      const newValue = { ...prev };
      return newValue;
    });
  };
  const handleCategoryChange = (value: number) => {
    setCategory(subcategoryData[value]);
    setSecondaryCategory(subcategoryData[value][0]);
    let index = PrimaryCategoryData.indexOf(value);
    setTotalCategory((prev) => {
      (prev as any).Category = PrimaryCategoryData[index];
      const newValue = { ...prev };
      return newValue;
    });
  };

  const onSecondaryCategoryChange = (value: any) => {
    setSecondaryCategory(value);
    setTotalCategory((prev) => {
      (prev as any).Subcategory = value;
      const newValue = { ...prev };
      return newValue;
    });
  };

  const sendCategoryValue = useCallback(() => {
    props.getCategoryValue(Totalcategory);
  }, [Totalcategory, props]);

  useEffect(() => {
    sendCategoryValue();
  }, [Totalcategory, sendCategoryValue]);

  return (
    <div className={styles.container}>
      <Row align="middle" justify="center">
        <Col xs={24} md={8} offset={1}>
          <h2>Project category</h2>
          <p>
            Choose a primary category and subcategory to help backers find your
            project.
          </p>
          <p>
            Your second subcategory will help us provide more relevant guidance
            for your project. It won’t display on your project page or affect
            how it appears in search results.
          </p>
          <p>You can change these anytime before and during your campaign.</p>
        </Col>
        <Col xs={24} md={14} offset={1}>
          <Form layout="vertical">
            <Row gutter={15}>
              <Col span={12}>
                <Form.Item
                  name="Primary category"
                  label="Primary category"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={handlePrimaryChange}
                    defaultValue={PrimaryCategoryData[0]}
                  >
                    <Option value="Select" disabled>
                      Select
                    </Option>
                    {PrimaryCategoryData.map((category: any) => (
                      <Option key={category}>{category}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Primary subcategory"
                  label="Primary subcategory"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={onSecondaryChange}
                    value={Secondary}
                  >
                    <Option value="Select" disabled>
                      Select
                    </Option>
                    {Primary.map((category: string) => (
                      <Option key={category}>{category}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col span={12}>
                <Form.Item name="Category" label="Category">
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={handleCategoryChange}
                    defaultValue={0}
                  >
                    <Option value={0} disabled>
                      Select
                    </Option>
                    {PrimaryCategoryData.map((category: any) => (
                      <Option key={category}>{category}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="Subcategory" label="Subcategory">
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={onSecondaryCategoryChange}
                    value={SecondaryCategory}
                    disabled={Totalcategory.Category === "" ? true : false}
                  >
                    <Option value="Select" disabled>
                      Select
                    </Option>
                    {Category.map((category: string) => (
                      <Option key={category}>{category}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectCategory;
