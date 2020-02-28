import React from "react";
import styled from "styled-components";
import MapPin from "shared/Icons/MapPin";
import { fontFamily, fontSize, color } from "style/theme";

const Container = styled.li`
    list-style: none;
    display: flex;
    flex-flow: column nowrap;
    justify-content: stretch;
    align-items: center;
    ul {
        width: 80%;
        border-top: 1px solid ${color.grey0};
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0.5rem;
        cursor: pointer;
        span {
            font-family: ${fontFamily};
            font-size: ${fontSize.XS}rem;
            color: ${color.black};
        }
    }
    ul:last-child {
        border-bottom: 1px solid ${color.grey0};
    }
`;

const DestinationList = props => {
    const { handleClick } = props;

    const [list] = React.useState([
        {
            id: 1,
            name: "อาคารวิศววัฒนะ (ตึกแดง)",
            position: { lat: 13.650006, lng: 100.494245 },
            place_id: "ChIJsT71PFKi4jARhU6xJydOuSY"
        },
        {
            id: 2,
            name: "อาคารเรียนและปฏิบัติการทางศิลปศาสตร์",
            position: { lat: 13.651919, lng: 100.493381 },
            place_id: "ChIJNf9Nn1Gi4jARL8YYquhn7iA"
        },
        {
            id: 3,
            name: "ภาควิชาฟิสิกส์ คณะวิทยาศาสตร์",
            position: { lat: 13.652529, lng: 100.494599 },
            place_id: "ChIJAd-3x1Gi4jARJjxhOvgiA8M"
        },
        {
            id: 4,
            name: "KMUTT Library",
            position: { lat: 13.652638, lng: 100.493939 },
            place_id: "ChIJ0_p-ulGi4jARwChSDlo_cJ4"
        },
        {
            id: 5,
            name: "ภาควิชาวิศวกรรมอิเล็กทรอนิกส์และโทรคมนาคม",
            position: { lat: 13.649599, lng: 100.4927 },
            place_id: "ChIJ_SRAzlOi4jARaOeQsItQUAw"
        },
        {
            id: 6,
            name: "ดรุณสิกขาลัย โรงเรียนนวัตกรรมแห่งการเรียนรู้",
            position: { lat: 13.649938, lng: 100.495291 },
            place_id: "ChIJcSO0BFKi4jARnc3KplBU1ag"
        }
    ]);

    const renderList = () => {
        return list.map(place => {
            return (
                <ul key={place.id} onClick={() => handleClick(place)}>
                    <MapPin size={24} color={`${color.orange1}`} />
                    <span>{place.name}</span>
                </ul>
            );
        });
    };

    return <Container>{renderList()}</Container>;
};

export default DestinationList;
