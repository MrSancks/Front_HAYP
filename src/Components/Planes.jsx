import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";


const Planes = () => {
	return (
        <div className="flex flex-col h-screen items-center">
        <Header/>
            <div className="antialiased max-w-6xl mx-auto px-8">
                <div className="relative block md:flex items-center">
                    <div className="w-full md:w-1/2 relative z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
                        <div className="text-lg font-medium text-green-500 uppercase p-8 text-center border-b border-gray-200 tracking-wide">Free</div>
                        <div className="block sm:flex md:block lg:flex items-center justify-center">
                            <div className="mt-8 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center">
                                <div className="inline-flex items-center">
                                    <span className="text-3xl font-medium">ADS</span>
                                </div>
                                <span className="block text-sm text-gray-600 mt-2">Veras Anuncios</span>
                                <span className="block text-sm text-gray-600 mt-2"></span>
                            </div>
                            <div className="mt-4 mb-8 sm:m-8 md:m-0 md:mt-4 md:mb-8 lg:m-8 text-center">
                                <div className="inline-flex items-center">
                                    <span className="text-3xl font-medium">Acceso limitado</span>
                                </div>
                                <span className="block text-sm text-gray-600 mt-2">5 generaciones por dia</span>
                                <span className="block text-sm text-gray-600 mt-2"></span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-3">
                            <ul>
                                <li className="flex items-center">
                                    <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-umbrella"><path className="primary" d="M11 3.05V2a1 1 0 0 1 2 0v1.05A10 10 0 0 1 22 13c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a10 10 0 0 1 9-9.95z" /><path className="secondary" d="M11 14a1 1 0 0 1 2 0v5a3 3 0 0 1-6 0 1 1 0 0 1 2 0 1 1 0 0 0 2 0v-5z" /></svg>
                                    </div>
                                    <span className="text-gray-700 text-lg ml-3">No se hacen cobros</span>
                                </li>
                                <li className="flex items-center mt-3">
                                    <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-shopping-bag"><path className="primary" d="M5 8h14a1 1 0 0 1 1 .92l1 12A1 1 0 0 1 20 22H4a1 1 0 0 1-1-1.08l1-12A1 1 0 0 1 5 8z" /><path className="secondary" d="M9 10a1 1 0 0 1-2 0V7a5 5 0 1 1 10 0v3a1 1 0 0 1-2 0V7a3 3 0 0 0-6 0v3z" /></svg>
                                    </div>
                                    <span className="text-gray-700 text-lg ml-3">No es necesario registro</span>
                                </li>
                                
                            </ul>
                        </div>
                        <a className="block flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-8 text-md font-semibold text-gray-800 uppercase mt-16" href="#">
                            <Link to="/">Comenzar a usar</Link>
                            <span className="font-medium text-gray-700 ml-2">➔</span>
                        </a>
                    </div>



                    <div className="w-full md:w-1/2 relative z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
                        <div className="text-lg font-medium text-green-500 uppercase p-8 text-center border-b border-gray-200 tracking-wide">PLUS</div>
                        <div className="block sm:flex md:block lg:flex items-center justify-center">
                            <div className="mt-8 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center">
                                <div className="inline-flex items-center">
                                    <span className="text-3xl font-medium">NO ADS</span>
                                </div>
                                <span className="block text-sm text-gray-600 mt-2">Nunca Veras Anuncios</span>
                            </div>
                            <div className="mt-4 mb-8 sm:m-8 md:m-0 md:mt-4 md:mb-8 lg:m-8 text-center">
                                <div className="inline-flex items-center">
                                    <span className="text-3xl font-medium">Acceso ilimitado</span>
                                </div>
                                <span className="block text-sm text-gray-600 mt-2">todas las generaciones que desees por dia</span>
                            </div>
                        </div>
                        <div className="flex justify-center mt-3">
                            <ul>
                                <li className="flex items-center">
                                    <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-umbrella"><path className="primary" d="M11 3.05V2a1 1 0 0 1 2 0v1.05A10 10 0 0 1 22 13c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a10 10 0 0 1 9-9.95z" /><path className="secondary" d="M11 14a1 1 0 0 1 2 0v5a3 3 0 0 1-6 0 1 1 0 0 1 2 0 1 1 0 0 0 2 0v-5z" /></svg>
                                    </div>
                                    <span className="text-gray-700 text-lg ml-3">$5 usd por mes</span>
                                </li>
                                
                                <li className="flex items-center mt-3">
                                    <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-shopping-bag"><path className="primary" d="M5 8h14a1 1 0 0 1 1 .92l1 12A1 1 0 0 1 20 22H4a1 1 0 0 1-1-1.08l1-12A1 1 0 0 1 5 8z" /><path className="secondary" d="M9 10a1 1 0 0 1-2 0V7a5 5 0 1 1 10 0v3a1 1 0 0 1-2 0V7a3 3 0 0 0-6 0v3z" /></svg>
                                    </div>
                                    <span className="text-gray-700 text-lg ml-3">Obten acceso ilimitado</span>
                                </li>
                            </ul>
                        </div>
                        <a className="block flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-8 text-md font-semibold text-gray-800 uppercase mt-16" href="#">
                            <Link to="/">Comienza aqui</Link>
                            <span className="font-medium text-gray-700 ml-2">➔</span>
                        </a>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default Planes;
