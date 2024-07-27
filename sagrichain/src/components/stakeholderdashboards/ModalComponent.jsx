import { useState } from 'react';

const ModalComponent = ({ modalOpen, closeModal, currentProduct, showHistory, setShowHistory, productQuantities, productHistory, decrementQuantity, incrementQuantity, trackHistory, buyProduct }) => {
  return (
    <>
      {modalOpen && currentProduct && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button onClick={closeModal} className="modal-close-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {!showHistory ? (
              <div>
                <h2 className="modal-title">Product Details</h2>
                <div className="modal-content">
                  <div className="md:text-right">
                    <p className="modal-content-label">Product Name:</p>
                  </div>
                  <div>
                    <p className="modal-content-value">{currentProduct.name}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="modal-content-label">Product Price:</p>
                  </div>
                  <div>
                    <p className="modal-content-value">Rs. {currentProduct.price}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="modal-content-label">Product Quantity:</p>
                  </div>
                  <div>
                    <p className="modal-content-value">{currentProduct.quantity} KG</p>
                  </div>
                  <div className="md:text-right">
                    <p className="modal-content-label">Product Category:</p>
                  </div>
                  <div>
                    <p className="modal-content-value">{currentProduct.category}</p>
                  </div>
                  <div className="modal-quantity-selector">
                    <button onClick={() => decrementQuantity(currentProduct.id)} className="modal-quantity-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="modal-quantity-display">{productQuantities[currentProduct.id] || 0}</div>
                    <button onClick={() => incrementQuantity(currentProduct.id)} className="modal-quantity-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="modal-action-buttons">
                  <button onClick={() => trackHistory(currentProduct.id)} className="modal-track-history-button">
                    <i className="fas fa-location-dot text-blue-500 w-4 mr-1 ml-1"></i>
                    Track History
                  </button>
                  <button onClick={() => buyProduct(currentProduct.id)} className="modal-buy-product-button">
                    <i className="fas fa-cart-plus mr-2"></i>
                    Buy Product
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-history-container">
                <h2 className="modal-history-title">Product History</h2>
                <div className="relative mt-2">
                  {productHistory.map((entry, index) => (
                    <div key={index} className="modal-history-entry">
                      <div className="modal-history-entry-divider">
                        <i className="modal-history-entry-divider-icon"></i>
                        <div className="modal-history-entry-divider-line"></div>
                      </div>
                      <div className="modal-history-entry-content">
                        <p><strong>Id:</strong> {entry.buyer}</p>
                        <p><strong>Role:</strong></p> <p className="uppercase italic">{entry.role}</p>
                        <p><strong>Timestamp:</strong> {entry.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <button onClick={() => setShowHistory(false)} className="modal-back-button">
                    <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
