import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="layout-main">
      <header>Main Navbar</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
