import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Theme, Header, HeaderName, HeaderGlobalBar, ExpandableSearch, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { User } from '@carbon/react/icons';
import { Link } from 'react-router-dom';

import './_dashboard-page.scss';

const DashboardPage = () => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);

    useEffect(() => {
        // Configuración y renderizado de la primera gráfica de dona
        if (chartRef1.current) {
            chartRef1.current.destroy();
        }

        const donutChart1 = document.getElementById('donutChart1');
        chartRef1.current = new Chart(donutChart1, {
            type: 'doughnut',
            data: {
                labels: ['Label 1', 'Label 2', 'Label 3'],
                datasets: [
                    {
                        data: [10, 20, 30],
                        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Work Location',
                    },
                },
            },
        });

        // Configuración y renderizado de la segunda gráfica de dona
        if (chartRef2.current) {
            chartRef2.current.destroy();
        }

        const donutChart2 = document.getElementById('donutChart2');
        chartRef2.current = new Chart(donutChart2, {
            type: 'doughnut',
            data: {
                labels: ['Label 4', 'Label 5', 'Label 6'],
                datasets: [
                    {
                        data: [15, 25, 35],
                        backgroundColor: ['#ff0000', '#00ff00', '#0000ff'],
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Another Chart',
                    },
                },
            },
        });
    }, []);

    return (
        <>
            <Theme theme="g100">
                <Header aria-label="IBM Platform Name">
                    <HeaderName prefix="IBM">Certifications Dashboard</HeaderName>
                    <HeaderGlobalBar>
                        <ExpandableSearch
                            size="lg"
                            placeholder="Search by Uid"
                            id="search-explandable-1"
                            onChange={() => {}}
                            onKeyDown={() => {}}
                        />
                        <OverflowMenu aria-label="User" flipped={true} renderIcon={User} size="lg">
                            <OverflowMenuItem itemText="Log out" href="/">
                                <Link to="/" />
                            </OverflowMenuItem>
                        </OverflowMenu>
                    </HeaderGlobalBar>
                </Header>
            </Theme>
            <div className="dashboard-container">
                <div className="chart-container">
                    <div className="canvas-container">
                        <canvas id="donutChart1"></canvas>
                    </div>
                </div>
                <div className="chart-container">
                    <div className="canvas-container">
                        <canvas id="donutChart2"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
