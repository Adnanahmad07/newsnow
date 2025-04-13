// /stocks/page.jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

export default function StocksPage() {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [symbol, setSymbol] = useState('AAPL');
    const [dataType, setDataType] = useState('TIME_SERIES_DAILY'); // Default data type

    const apiKey = '5CCALCYLRZ2704R1';

    const fetchStockData = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://www.alphavantage.co/query?function=${dataType}&symbol=${symbol}&apikey=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data['Error Message']) {
                throw new Error(data['Error Message']);
            }

            if (!data['Time Series (Daily)'] && !data['Time Series (Intraday)'] && !data['Weekly Time Series']) {
                throw new Error('No time series data found in the API response.');
            }

            setStockData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchStockData();
    };

    const chartData = stockData
        ? Object.entries(stockData['Time Series (Daily)'] || stockData['Time Series (Intraday)'] || stockData['Weekly Time Series'])
            .map(([date, data]) => ({
                date,
                close: parseFloat(data['4. close']),
            }))
            .reverse()
        : [];

    const getPriceChangeColor = (current, previous) => {
        if (!previous) return 'bg-gray-100'; // Default background color
        return current > previous ? 'bg-green-100' : 'bg-red-100';
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-[800px]">
            <h1 className="text-3xl font-bold mb-6">Stock Data</h1>
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <Input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    className="flex-1"
                />
                <select
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="TIME_SERIES_DAILY">Daily</option>
                    <option value="TIME_SERIES_INTRADAY">Intraday</option>
                    <option value="TIME_SERIES_WEEKLY">Weekly</option>
                </select>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </Button>
            </form>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    Error: {error}
                </div>
            )}
            {stockData && (stockData['Time Series (Daily)'] || stockData['Time Series (Intraday)'] || stockData['Weekly Time Series']) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(stockData['Time Series (Daily)'] || stockData['Time Series (Intraday)'] || stockData['Weekly Time Series'])
                            .slice(0, 4)
                            .map(([date, data], index, arr) => {
                                const previousClose = index < arr.length - 1 ? parseFloat(arr[index + 1][1]['4. close']) : null;
                                const currentClose = parseFloat(data['4. close']);
                                const priceChangeColor = getPriceChangeColor(currentClose, previousClose);

                                return (
                                    <Card key={date} className={`w-full ${priceChangeColor}`}>
                                        <CardHeader>
                                            <CardTitle>{date}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p><strong>Open:</strong> {data['1. open']}</p>
                                            <p><strong>High:</strong> {data['2. high']}</p>
                                            <p><strong>Low:</strong> {data['3. low']}</p>
                                            <p className={currentClose > previousClose ? 'text-green-500' : 'text-red-500'}>
                                                <strong>Close:</strong> {data['4. close']}
                                            </p>
                                            <p><strong>Volume:</strong> {data['5. volume']}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                    </div>

                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Stock Price Chart</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="close"
                                            stroke="#8884d8"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}