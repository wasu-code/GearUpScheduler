function Footer() {
  return (
    <footer className="text-sm bg-slate-900 text-slate-100 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <nav>
          <ul className="list-none flex">
            <li className="pr-3">O nas</li>
            <li className="px-3">FAQ</li>
            <li className="px-3">Profil</li>
            <li className="px-3">Zarezerwuj wizytę</li>
          </ul>
        </nav>
        <hr className="border-0 h-[1px] bg-slate-600 my-5" />
        <div className="flex justify-between pt-1 pb-2 flex-col md:flex-row text-center md:text-start">
          <p className="italic text-slate-100 text-xl">GearUpScheduler</p>
          <p className="text-slate-600">
            &copy; 2023 GearUpScheduler. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
