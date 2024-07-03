import React, { useState, useEffect } from 'react';

export const Error404 = function () {
  useEffect(() => {
    const loadStyles = async () => {
      // Simula una carga asíncrona del archivo CSS
      await import('../../assets/css/error404.css');
    };

    loadStyles();
  }, []);


  return (
    <div className="error">
      <h2>Página no encontrada</h2>{' '}
    </div>
  );
};
