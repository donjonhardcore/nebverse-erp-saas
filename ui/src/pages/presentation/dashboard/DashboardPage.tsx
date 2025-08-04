/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
import React, { useContext, useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { TABS, TTabs } from './common/helper';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import ThemeContext from '../../../contexts/themeContext';

// Import ChatBot component
import ChatBot from '../../../components/ChatBot/ChatBot';

// Import tab components
import OverviewTab from './tabs/OverviewTab';
import ProjectTab from './tabs/ProjectTab';
import ClientTab from './tabs/ClientTab';
import HRTab from './tabs/HRTab';
import TicketTab from './tabs/TicketTab';
import FinanceTab from './tabs/FinanceTab';

const DashboardPage = () => {
	const { mobileDesign } = useContext(ThemeContext);

	// Tour logic
	const { setIsOpen } = useTour();
	useEffect(() => {
		if (localStorage.getItem('tourModalStarted') !== 'shown' && !mobileDesign) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 7000);
		}
	}, [mobileDesign, setIsOpen]);

	const { themeStatus } = useDarkMode();
	const [activeTab, setActiveTab] = useState<TTabs>(TABS.OVERVIEW);

	// Clock logic
	const [currentTime, setCurrentTime] = useState(new Date());
	const [clockInTime, setClockInTime] = useState<Date | null>(null);
	const [isClockedIn, setIsClockedIn] = useState(false);
	const [isChatbotOpen, setIsChatbotOpen] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const handleClockToggle = () => {
		if (!isClockedIn) {
			setClockInTime(new Date());
		}
		setIsClockedIn((prev) => !prev);
	};

	// Render tab content based on active tab
	const renderTabContent = () => {
		switch (activeTab) {
			case TABS.OVERVIEW:
				return <OverviewTab activeTab={activeTab} />;
			case TABS.PROJECT:
				return <ProjectTab />;
			case TABS.CLIENT:
				return <ClientTab />;
			case TABS.HR:
				return <HRTab />;
			case TABS.TICKET:
				return <TicketTab />;
			case TABS.FINANCE:
				return <FinanceTab />;
			default:
				return <OverviewTab activeTab={activeTab} />;
		}
	};

	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>NEBVerse Dashboard</span>
					<SubheaderSeparator />
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}
							>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>

				<SubHeaderRight>
					<div className="text-end me-3">
						<div className="h5 mb-0 fw-bold">
							{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</div>
						<div className="text-muted small ">
							{currentTime.toLocaleDateString('en-US', { weekday: 'long' })}
						</div>
						{isClockedIn && clockInTime && (
							<div className="text-muted small">
								Clock In at - {clockInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
							</div>
						)}
					</div>
					<Button
						color={isClockedIn ? 'primary' : 'secondary'}
						isLight
						icon={isClockedIn ? 'Logout' : 'WatchLater'}
						rounded={'end'}
						size={'lg'}
						shadow={'default'}
						onClick={handleClockToggle}
					>
						{isClockedIn ? 'Clock Out' : 'Clock In'}
					</Button>
					<SubheaderSeparator />
				</SubHeaderRight>
				<Button
					icon='Settings'
					color='info'
					isLink
					size='lg'
				>
				</Button>
				<Button
					icon='SmartToy'
					color='success'
					isLight
					size='lg'
					onClick={() => setIsChatbotOpen(!isChatbotOpen)}
				>
					AI Assistant
				</Button>
			</SubHeader>

			<Page container='fluid'>
				{renderTabContent()}
			</Page>

			{/* ChatBot Component */}
			<ChatBot 
				isOpen={isChatbotOpen}
				onClose={() => setIsChatbotOpen(!isChatbotOpen)}
			/>
		</PageWrapper>
	);
};

export default DashboardPage;