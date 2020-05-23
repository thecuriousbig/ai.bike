import React from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import HeadBar from 'shared/HeadBar';
import ProgressBar from 'shared/ProgressBar';
import Container from '../component/Container';
import ContentContainer from '../component/ContentContainer';
import StaticMap from './component/StaticMap';
import Summary from './component/Summary';
import { useRouteStateContext } from 'context/routing';
import { useUserContext } from 'context/user';
import { fontFamily, fontSize, color, device } from 'style/theme';

const StyledProgressBar = styled(ProgressBar)`
	padding: 1rem 0;
`;

const Title = styled.p`
	font-family: ${fontFamily};
	font-size: calc(${fontSize.XS}rem + 0.25rem);
	color: ${color.black};
	padding-left: 1rem;
`;

const FooterSection = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	@media ${device.tablet} {
		width: 60%;
	}
	@media ${device.laptop} {
		width: 50%;
	}
`;

const ConfirmationButton = styled.button`
	width: 80%;
	height: 50px;
	line-height: 50px;
	border: none;
	border-radius: 20px;
	margin: 1rem;
	font-family: ${fontFamily};
	font-size: ${fontSize.XS}rem;
	color: ${color.white};
	background: linear-gradient(180deg, ${color.green1} 0%, ${color.green2} 100%);
`;

const OrderStepThreePage = (props) => {
	const routeState = useRouteStateContext();
	const { user } = useUserContext();
	const history = useHistory();

	const { bike, origin, destination, direction, duration, distance, travelMode } = routeState;

	const handleConfirmOrder = async (e) => {
		try {
			/* for COVID situations */
			let place_id;
			switch (destination.place_id) {
				case 'ChIJsT71PFKi4jARhU6xJydOuSY':
					place_id = 1;
					break;
				case 'ChIJNf9Nn1Gi4jARL8YYquhn7iA':
					place_id = 2;
					break;
				case 'ChIJAd-3x1Gi4jARJjxhOvgiA8M':
					place_id = 3;
					break;
				case 'ChIJ0_p-ulGi4jARwChSDlo_cJ4':
					place_id = 4;
					break;
				default:
					place_id = 0;
			}
			
			const order = {
			    id: uuidv4(),
			    user: user,
			    flag: "DELIVERING",
				vehicle: bike,
				destination: place_id
			    // origin: JSON.stringify(origin),
			    // destination: JSON.stringify(destination),
			    // direction: JSON.stringify(direction),
			    // duration: JSON.stringify(duration),
			    // distance: JSON.stringify(distance),
			    // travelMode: travelMode
			};
			const result = await API.post('order', '/order', { body: order });
			console.log(result);
			history.replace('/order');
		} catch (error) {
			console.log('confirm order error: ', error);
		}
	};

	return (
		<Container>
			<HeadBar />
			<ContentContainer>
				<StyledProgressBar currentStep={3} />
				<Title>สรุปผลคำสั่ง</Title>
				<StaticMap direction={direction} />
				<Summary
					bike={bike}
					origin={origin}
					destination={destination}
					duration={duration}
					distance={distance}
					travelMode={travelMode}
				/>
			</ContentContainer>
			<FooterSection>
				<ConfirmationButton onClick={handleConfirmOrder}>ยืนยันคำสั่ง</ConfirmationButton>
			</FooterSection>
		</Container>
	);
};

export default OrderStepThreePage;
