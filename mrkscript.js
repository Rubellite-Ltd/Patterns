
   <script>
        // Function to toggle sidebar visibility
        function toggleMenu() {
            var sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        }

        // Function to show individual content section
        function showContent(contentId) {
            var contents = document.querySelectorAll('.content');
            contents.forEach(function(content) {
                content.classList.remove('active');
            });
            document.getElementById(contentId).classList.add('active');

            // Hide sidebar after clicking a button (only for small screens)
            var sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }

            document.addEventListener('DOMContentLoaded', function () {
            var currentYear = new Date().getFullYear();
            document.getElementById('copyright-year').innerText = '© ' + currentYear + ' Rubellite Ltd. All rights reserved.';
        });

        
    </script>
