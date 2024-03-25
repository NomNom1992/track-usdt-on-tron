/**
 * Retrieves the balance value from the API response.
 *
 * @return {string} The balance value, or an error message if an error occurred.
 * @customfunction
 */
function getTronBalance(walletAddress) {
  const apiUrl = `https://apilist.tronscanapi.com/api/token_trc20/holders?start=0&limit=5&contract_address=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t&holder_address=${walletAddress}`;

  const fetchOptions = {
    method: 'GET',
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(apiUrl, fetchOptions);
    const data = JSON.parse(response.getContentText());

    // Kiểm tra nếu mảng trc20_tokens có ít nhất một phần tử
    if (data.trc20_tokens && data.trc20_tokens.length > 0) {
      // Lấy giá trị balance từ phần tử đầu tiên của mảng trc20_tokens
      const balance = data.trc20_tokens[0].balance;
      return balance/1000000;
    } else {
      return 'Không có dữ liệu balance trong phản hồi';
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu balance:', error);
    return 'Lỗi: ' + error.message;
  }
}
