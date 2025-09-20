export default function Footer() {
    return (
        <footer className="border-t bg-white mt-6">
            <div className="container mx-auto text-center py-4 text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} SweetShop. All rights reserved.</p>
            </div>
        </footer>
    );
}
