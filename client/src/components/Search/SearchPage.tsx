import { Col, Input, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { SearchEngineAsync } from "../../Slices/postSlice";
import LocationSearch from "./LocationSearch";
import SearchedProjectForm from "./SearchedProjectForm";
import SortSearch from "./SortSearch";
import styles from "../UserSetting/saved/SavedProject.module.css";
import { useParams } from "react-router-dom";
import { Project } from "../types";

const PrimaryCategoryData: any = [
  "All Categories",
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

function SearchPage() {
  const dispatch = useAppDispatch();
  const paramsInfo = useParams();
  const [searchTerm, setSearchTerms] = useState(paramsInfo.terms || "");
  const [selectedMainCategory, setselectedMainCategory] = useState("");
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const [subCategoryArrayOfMain, setSubCategoryArrayOfMain] = useState([]);
  const [Location, setLocation] = useState("");
  const [filteredFromBackList, setFilteredFromBackList] = useState([]);
  useEffect(() => {
    if (paramsInfo.terms) {
      setSearchTerms(paramsInfo.terms);
    }
  }, [paramsInfo]);
  useEffect(() => {
    let body = {
      term: searchTerm,
      main: selectedMainCategory,
      sub: selectedSubCategory,
      location: Location,
    };
    dispatch(SearchEngineAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setFilteredFromBackList(res.payload.final);
      }
    });
  }, [
    dispatch,
    searchTerm,
    selectedMainCategory,
    selectedSubCategory,
    Location,
    paramsInfo,
  ]);
  const onSearchTermChange = useCallback((e) => {
    setSearchTerms(e.target.value);
  }, []);

  const getLocationValue = useCallback((location) => {
    setLocation(location);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0",
          borderBottom: "1px solid #D9D9D9",
          fontSize: "24px",
        }}
      >
        Show me{" "}
        <Input
          allowClear
          value={searchTerm}
          onChange={onSearchTermChange}
          size="large"
          style={{ width: "auto", margin: "0 5px" }}
        />
        projects in{" "}
        <Select
          value={
            selectedSubCategory || selectedMainCategory || "All Categories"
          }
          style={{ margin: "0 5px" }}
          placeholder="All Categories"
          defaultValue="All Categories"
          size={"large"}
          dropdownMatchSelectWidth={false}
          dropdownRender={(menu) => (
            <Row>
              <Col>
                <h5 style={{ padding: "10px 20px" }}>CATEGORIES</h5>
                <hr color="#D9D9D9" />
                <Row
                  style={{ padding: "0px 20px 20px 20px", marginTop: 0 }}
                  gutter={20}
                >
                  <Col span={12}>
                    {PrimaryCategoryData.map((item: string, i: number) => {
                      if (i % 2 === 0) {
                        return (
                          <li
                            key={i}
                            style={{ listStyle: "none", width: "100px" }}
                            onClick={() => {
                              setSubCategoryArrayOfMain(subcategoryData[item]);
                              if (i === 0) {
                                setselectedMainCategory("");
                              } else {
                                setselectedMainCategory(item);
                              }
                            }}
                          >
                            <a type="button" style={{ margin: "5px" }}>
                              {item}
                            </a>
                          </li>
                        );
                      }
                    })}
                  </Col>
                  <Col span={12}>
                    {PrimaryCategoryData.map((item: string, i: number) => {
                      if (i % 2 === 1) {
                        return (
                          <li
                            key={i}
                            style={{ listStyle: "none", width: "100px" }}
                            onClick={() => {
                              setselectedMainCategory(item);
                              setSubCategoryArrayOfMain(subcategoryData[item]);
                              setselectedSubCategory("");
                            }}
                          >
                            <a type="button" style={{ margin: "5px" }}>
                              {item}
                            </a>
                          </li>
                        );
                      }
                    })}
                  </Col>
                </Row>
              </Col>
              {subCategoryArrayOfMain && selectedMainCategory ? (
                <Col>
                  <h5 style={{ padding: "10px 20px" }}>
                    {selectedMainCategory}
                  </h5>
                  <hr color="#D9D9D9" />
                  <Row style={{ padding: "0px 20px 20px 20px" }} gutter={20}>
                    <Col span={14}>
                      {subCategoryArrayOfMain?.map(
                        (item: string, i: number) => {
                          if (i % 2 === 0) {
                            return (
                              <li
                                key={i}
                                style={{ listStyle: "none" }}
                                onClick={() => {
                                  if (i === 0) {
                                    setselectedSubCategory("");
                                  } else {
                                    setselectedSubCategory(item);
                                  }
                                }}
                              >
                                <a type="button" style={{ margin: "5px" }}>
                                  {item}
                                </a>
                              </li>
                            );
                          }
                        }
                      )}
                    </Col>
                    <Col span={10}>
                      {subCategoryArrayOfMain?.map(
                        (item: string, i: number) => {
                          if (i % 2 === 1) {
                            return (
                              <li
                                key={i}
                                style={{ listStyle: "none", width: "100px" }}
                                onClick={() => {
                                  setselectedSubCategory(item);
                                }}
                              >
                                <a type="button" style={{ margin: "5px" }}>
                                  {item}
                                </a>
                              </li>
                            );
                          }
                        }
                      )}
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>
          )}
        ></Select>
        on <LocationSearch getLocationValue={getLocationValue} /> sorted by{" "}
        <SortSearch />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          className={styles.searchContentContainer}
          style={{ marginTop: "30px", textAlign: "start" }}
        >
          {filteredFromBackList?.map((item: Project) => (
            <div className={styles.girdItem} key={item._id}>
              <SearchedProjectForm item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
