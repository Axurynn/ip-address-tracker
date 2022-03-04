import { useState } from 'react';
import s from './Home.module.scss';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';

import bgImg from '../../assets/images/pattern-bg.png';
import Arrow from '../../assets/svg/icon-arrow.svg?component';
import Icon from '../../assets/svg/icon-location.svg?component';

const Home = () => {
	const [value, setValue] = useState('');
	const [address, setAddress] = useState({
		ip: '192.212.174.101',
		location: {
			city: 'Brooklyn, NY 10001',
			lat: 51.505,
			lng: -0.09,
			timezone: '-05:00',
		},
		isp: 'SpaceX Starlink',
	});

	const handleSubmit = async e => {
		e.preventDefault();
		const data = await fetch(
			`/api?apiKey=${import.meta.env.VITE_API_KEY}&ipAddress=${value}`
		);
		const ipInfo = await data.json();
		setAddress(ipInfo);
	};

	const icon = L.icon({
		iconUrl:
			'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
		iconSize: [25, 40],
		// iconAnchor: position,
		// popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	const ServicesLocation = ({ pos }) => {
		const map = useMap();

		if (pos !== null) {
			map.flyTo(pos, 13);
		}

		return null;
	};

	return (
		<div className={s.home}>
			<div className={s.header}>
				<img className={s.bgImg} src={bgImg} alt='background image' />
				<h1 className={s.headerTitle}>IP Address Tracker</h1>
				<form
					className={s.headerInputContainer}
					onSubmit={e => handleSubmit(e)}
				>
					<input
						className={s.input}
						type='text'
						placeholder='Search for any IP address or domain'
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<button className={s.button}>
						<Arrow />
					</button>
				</form>
			</div>
			<div className={s.main}>
				<ul className={s.infos}>
					<li className={s.item}>
						Ip address <span className={s.itemSpan}>{address?.ip}</span>
					</li>
					<li className={s.item}>
						Location{' '}
						<span className={s.itemSpan}>{address?.location?.city}</span>
					</li>
					<li className={s.item}>
						Timezone{' '}
						<span className={s.itemSpan}>UTC {address?.location?.city}</span>
					</li>
					<li className={s.item}>
						ISP <span className={s.itemSpan}>{address?.isp}</span>
					</li>
				</ul>
			</div>
			<div className={s.leaflet}>
				<MapContainer
					center={[address?.location?.lat, address?.location?.lng]}
					zoom={13}
					scrollWheelZoom={false}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Marker
						position={[address?.location?.lat, address?.location?.lng]}
						icon={icon}
					>
						<Popup>{address?.location?.city}</Popup>
					</Marker>
					<ServicesLocation pos={address?.location} />
				</MapContainer>
			</div>
		</div>
	);
};

export default Home;
