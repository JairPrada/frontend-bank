const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-emerald-950 text-white z-20">
            <div className="border-t border-emerald-900">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-emerald-100">
                            © {new Date().getFullYear()} NeoBank. Todos los derechos
                            reservados.
                        </p>
                        <div className="flex items-center gap-6">
                            <span className="text-xs text-emerald-100">
                                Encriptación SSL 256-bit
                            </span>
                            <span className="text-xs text-emerald-100">
                                Asegurado por FDIC
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
