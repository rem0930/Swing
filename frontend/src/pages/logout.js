function logout() {
    // localStorageからトークンを削除
    localStorage.removeItem('token');

    // ユーザーをログアウト後のページにリダイレクト
    router.push('/login');
}
